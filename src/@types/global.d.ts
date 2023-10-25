declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void; // Declare a função load, se necessário
      };
    };
  }
}
