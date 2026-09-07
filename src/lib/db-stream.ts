import net from 'node:net'
import dns from 'node:dns'

/**
 * Reliable-DNS socket factory for the Postgres (Neon) connection.
 *
 * Why this exists: on some ISP routers (observed here with a Jio/Reliance
 * router at 192.168.29.1) the local DNS resolver intermittently returns
 * REFUSED for Neon's long `*.aws.neon.tech` hostnames, which surfaces as
 * `getaddrinfo ENOTFOUND` and random DB connection failures. Node's default
 * socket uses the OS resolver, so it inherits that flakiness.
 *
 * How it works: pg calls `stream.connect(port, host)`. We intercept that,
 * resolve `host` to an IP via a dedicated resolver pointed at public DNS
 * (Cloudflare/Google/Quad9), and connect to the IP. pg keeps the original
 * hostname in its own scope, so the TLS upgrade still sets `servername` to the
 * Neon hostname — which Neon needs to route to the right compute, and which the
 * certificate validates against. Falls back to the OS resolver on failure.
 */

const resolver = new dns.promises.Resolver()
resolver.setServers(['1.1.1.1', '8.8.8.8', '9.9.9.9'])

const resolveHost = async (host: string): Promise<string> => {
  try {
    const addresses = await resolver.resolve4(host)
    if (addresses && addresses.length > 0) return addresses[0]
  } catch {
    // fall through to OS resolver
  }
  const { address } = await dns.promises.lookup(host, { family: 4 })
  return address
}

export const createReliableStream = () => {
  const socket = new net.Socket()
  const originalConnect = socket.connect.bind(socket)

  socket.connect = function connect(this: net.Socket, ...args: unknown[]): net.Socket {
    const [a, b, c] = args

    // Domain-socket form: connect(path[, listener]) — pass straight through.
    if (typeof a === 'string') {
      return originalConnect(...(args as Parameters<typeof originalConnect>))
    }
    // Options-object form: connect(options[, listener]).
    if (a && typeof a === 'object') {
      const opts = a as net.TcpNetConnectOpts
      if (opts.host && net.isIP(opts.host) === 0) {
        resolveHost(opts.host)
          .then((ip) => originalConnect({ ...opts, host: ip }, b as (() => void) | undefined))
          .catch(() => originalConnect(opts, b as (() => void) | undefined))
        return socket
      }
      return originalConnect(...(args as Parameters<typeof originalConnect>))
    }

    // (port, host[, listener]) form — the path pg uses for Neon.
    const port = a as number
    const host = b as string | undefined
    const listener = (typeof c === 'function' ? c : undefined) as (() => void) | undefined
    if (host && net.isIP(host) === 0) {
      resolveHost(host)
        .then((ip) => originalConnect(port, ip, listener))
        .catch(() => originalConnect(port, host, listener))
      return socket
    }
    return originalConnect(...(args as Parameters<typeof originalConnect>))
  } as typeof socket.connect

  return socket
}
