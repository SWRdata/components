$(document).pjax('a', '#pjax-container', {
  fragment: '#pjax-container'
});
const events = ['start', 'error', 'success', 'end'];

events.forEach((e) => {
  $(document).on(`pjax:${e}`, function (event) {
    console.log(event);
  });
});

// function attachShadowRoots(root) {
//   root.querySelectorAll('template[shadowrootmode]').forEach((template) => {
//     const mode = template.getAttribute('shadowrootmode');
//     const shadowRoot = template.parentNode.attachShadow({ mode });

//     shadowRoot.appendChild(template.content);
//     template.remove();
//     attachShadowRoots(shadowRoot);
//   });
// }
// $('#pjax-container').on('pjax:end', () => {
//   attachShadowRoots(document);
// });
