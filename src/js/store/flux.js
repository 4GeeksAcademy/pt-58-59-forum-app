const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      threads: [],
      userdata: {},
    },
    actions: {
      auth: {
        login: async (username, password) => {
          //
        },

        signup: async (email, username, password) => {
          //
        },
      },

      threads: {
        create: async () => {
          //
        },

        readMany: async (limit = 10, offset = 0) => {
          const resp = await fetch(
            `https://4geeks.dotlag.space/forum/threads/?limit=${limit}&offset=${offset}`
          );
          if (resp.ok) {
            const data = await resp.json();
            setStore({ threads: data.threads });
          }
        },

        read: async (thread_id) => {
          //
        },
      },

      posts: {
        create: async () => {
          //
        },
      },
    },
  };
};

export default getState;
