//Здесь хранятся значение и гет/сет функции для общей переменной имени созданного объявления

let lastCreatedAdName = "Editted Test-Advert #282";
const imgUrl = "https://global-sensors.com/wp-content/uploads/2021/07/test.jpg";
const description = "Lorem Ipsum";

function generatePrice() {
  return Math.floor(Math.random() * (1000 - 100) + 100) + ""; //Генерируем рандомную цену от 100 до 999
}

function setLastCreatedAdName(name) {
  lastCreatedAdName = name;
}
function getLastCreatedAdName() {
  return lastCreatedAdName;
}




const pagePaginationData = {
  adName: 'page test',
  price: 123,
  description: 'Lorem ipsum something something test',
  imgUrl: 'test'
}

export {
  setLastCreatedAdName,
  getLastCreatedAdName,
  generatePrice,
  pagePaginationData,
  imgUrl,
  description,
};
