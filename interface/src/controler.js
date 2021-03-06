const axios = require('axios');

const portainer_instance = axios.create({
  baseURL: `${process.env.PORTAINER_HOST}/api/endpoints/${process.env.PORTAINER_ENV_ID}/docker`,
  headers: {
    'X-API-Key': process.env.PORTAINER_TOKEN,
  },
});

const createContainer = async (name) => {
  try {
    const resCreate = await portainer_instance.post(
      `/containers/create?name=${name}`,
      {
        HostName: 'ssh2',
        Image: 'ssh:latest',
        ExposedPorts: { '22/tcp': {} },
        Labels: { 'com.docker.compose.project': 'porfolio' },
        HostConfig: {
          PortBindings: {
            // '22/tcp': [{ HostPort: '22' }],
          },
        },
      }
    );
    console.log(`Container ${name} : Created`);
  } catch (err) {
    console.log(`Container ${name} : Creation failed\nError: ${err.message}`);
    return false;
  }

  try {
    const resStart = await portainer_instance.post(`/containers/${name}/start`);
    console.log(`Container ${name} : Started`);
  } catch (err) {
    console.log(`Container ${name} : Start failed\nError: ${err.message}`);
    return false;
  }

  try {
    const resNetworkConnect = await portainer_instance.post(
      `/networks/${process.env.SSH_NETWORK}/connect`,
      { Container: name }
    );
    console.log(`Container ${name} : Connected`);
  } catch (err) {
    console.log(`Container ${name} : Creation failed\nError: ${err.message}`);
    return false;
  }
  return true;
};

const deleteContainer = async (name) => {
  try {
    const resStop = await portainer_instance.post(`/containers/${name}/stop`);
    console.log(`Container ${name} : Stopped`);

    const resDelete = await portainer_instance.delete(`/containers/${name}`);
    console.log(`Container ${name} : Removed`);
    return true;
  } catch (err) {
    console.log(`Container ${name} : Deletion failed`);
    console.error(err.message);
    return false;
  }
};

module.exports = { deleteContainer, createContainer };
