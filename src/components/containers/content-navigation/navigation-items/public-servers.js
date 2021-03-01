import PublicServers from "../../../main/public-servers/PublicServers";

// youre gonna pass props at some point
const PublicServersContent = ({publicServerList, selectPublicServer}) => {
  return <PublicServers selectPublicServer={selectPublicServer} publicServerList={publicServerList} />;
};

export default PublicServersContent