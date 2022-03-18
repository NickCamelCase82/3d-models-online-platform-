const bascketMain = document.getElementById('bascketMain');
console.log(bascketMain);

bascketMain.addEventListener('click', async (ev) => {
  if (ev.target.tagName === 'A' && ev.target.innerText === 'Remove') {
    const { id } = ev.target.dataset;
    if (id) {
      const response = await fetch(`/basket/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (response.status === 200) {
        const oneModel = document.getElementById(`forOneModel${id}`);
        oneModel.remove();
      } else {
        alert('ERROR');
      }
    }
  }
});
