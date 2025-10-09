// Centralized page selectors for https://the-internet.herokuapp.com/

export const Sel = {
  home: {
    header: "h1",
    link: (text) => `a:contains('${text}')`,
  },
  dragAndDrop: {
    a: "#column-a",
    b: "#column-b",
    header: "h3",
  },
  iframe: {
    frame: "#mce_0_ifr",
    editorBody: "body#tinymce",
  },
  disappearing: {
    menu: "#content ul li a",
  }
};
