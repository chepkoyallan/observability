/** get the server address from host, port, and schema (defaults to 'http'). */
export function getAddress({
    host,
    port,
    namespace,
    schema = 'http',
  }: {
    host: string;
    port?: string | number;
    namespace?: string;
    schema?: string;
  }) {
    namespace = namespace ? `.${namespace}` : '';
    port = port ? `:${port}` : '';
    return `${schema}://${host}${namespace}${port}`;
  }
  