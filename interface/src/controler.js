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
            '22/tcp': [{ HostPort: '22' }],
          },
        },
      }
    );
    console.log(`Container ${name} : Created`);

    const resStart = await portainer_instance.post(`/containers/${name}/start`);
    console.log(`Container ${name} : Started`);
    return true;
  } catch (err) {
    console.log(`Container ${name} : Creation failed`);
    console.error(err.response);
    return false;
  }
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
    console.error(err.response);
    return false;
  }
};

module.exports = { deleteContainer, createContainer };
