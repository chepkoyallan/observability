import * as path from "path";
export const BASEPATH = "/pipeline";
export const apiVersion = "v1beta1";
export const apiVersionPrefix = `apis/${apiVersion}`;
export type ProcessEnv = NodeJS.ProcessEnv | { [key: string]: string };

export interface PipelineConfigs {
  host: string;
  port: string | number;
}

export enum Deployments {
  NOT_SPECIFIED = "NOT_SPECIFIED",
  KUBEFLOW = "KUBEFLOW",
  MARKETPLACE = "MARKETPLACE"
}

/** converts string to bool */
const asBool = (value: string) => ["true", "1"].includes(value.toLowerCase());

function parseArgs(argv: string[]) {
  if (argv.length < 3) {
    const msg = `\
  Usage: node server.js <static-dir> [port].
         You can specify the API server address using the
         ML_PIPELINE_SERVICE_HOST and ML_PIPELINE_SERVICE_PORT
         env vars.`;
    throw new Error(msg);
  }

  const staticDir = path.resolve(argv[2]);
  const port = parseInt(argv[3] || "3000", 10);
  return { staticDir, port };
}

export function loadConfigs(argv: string[], env: ProcessEnv): UIConfigs {
  const { staticDir, port } = parseArgs(argv);
  const {
    /** API service will listen to this host */
    ML_PIPELINE_SERVICE_HOST = 'localhost',
    /** API service will listen to this port */
    ML_PIPELINE_SERVICE_PORT = '3001',

    DEPLOYMENT: DEPLOYMENT_STR = "",
    HIDE_SIDENAV
  } = env;

  return {
    pipeline: {
      host: ML_PIPELINE_SERVICE_HOST,
      port: ML_PIPELINE_SERVICE_PORT,
    },
    server: {
      apiVersionPrefix,
      basePath: BASEPATH,
      deployment:
        DEPLOYMENT_STR.toUpperCase() === Deployments.KUBEFLOW
          ? Deployments.KUBEFLOW
          : DEPLOYMENT_STR.toUpperCase() === Deployments.MARKETPLACE
          ? Deployments.MARKETPLACE
          : Deployments.NOT_SPECIFIED,
      hideSideNav:
        HIDE_SIDENAV === undefined
          ? DEPLOYMENT_STR.toUpperCase() === Deployments.KUBEFLOW
          : asBool(HIDE_SIDENAV),
      port,
      staticDir
    }
  };
}

export interface ServerConfigs {
  basePath: string;
  port: string | number;
  staticDir: string;
  apiVersionPrefix: string;
  deployment: Deployments;
  hideSideNav: boolean;
}
export interface UIConfigs {
  server: ServerConfigs;
  // artifacts: {
  //   aws: AWSConfigs;
  //   minio: MinioConfigs;
  //   http: HttpConfigs;
  //   proxy: ArtifactsProxyConfig;
  //   streamLogsFromServerApi: boolean;
  // };
  // argo: ArgoConfigs;
  // metadata: MetadataConfigs;
  // visualizations: VisualizationsConfigs;
  // viewer: ViewerConfigs;
  pipeline: PipelineConfigs;
  // gkeMetadata: GkeMetadataConfigs;
  // auth: AuthConfigs;
}
