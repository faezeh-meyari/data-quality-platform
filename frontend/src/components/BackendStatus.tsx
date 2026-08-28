type BackendStatusProps = {
  status: string;
};

function BackendStatus({ status }: BackendStatusProps) {
  return <p>Backend status: {status}</p>;
}

export default BackendStatus;
