// data.js
export function getData(id) {
  return fetch(`https://api.example.com/data/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    });
}
