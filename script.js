//Завдання 1

// Оригінальна функція, яка повертає Promise.
function fetchFakeData() {
  const fakeData = {
    name: "John",
    age: 30,
  };
  return Promise.resolve(fakeData);
}

async function getData() {
  try {
    const data = await fetchFakeData();
    console.log("Дані отримано:", data);
  } catch (error) {
    console.error("Помилка під час отримання даних:", error);
  }
}
// Створюємо асинхронну функцію getData, яка використовує await для обробки Promise.
// Використовуємо try для обробки помилок
// Використовуємо await для очікування виконання Promise.
// Дані виводимо в консоль після отримання їх з Promise.
// Використовуємо catch для обробки будь-яких помилок, що виникли під час виконання Promise, та виводимо їх в консоль.

// Розкоментуйте після виконання завданння
console.log("Завдання: 1 ==============================");
// // Викликаємо нашу асинхронну функцію.
getData();

function getRandomNumberAfterSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, seconds * 1000);
  });
}

async function logRandomNumberAfterSeconds(seconds) {
  try {
    const randomNumber = await getRandomNumberAfterSeconds(seconds);
    console.log(`Випадкове число після ${seconds} секунд: ${randomNumber}`);
  } catch (error) {
    console.error("Помилка під час отримання випадкового числа:", error);
  }
}

console.log("Завдання: 2 ==============================");
logRandomNumberAfterSeconds(3);


async function getDataFromUrl(URL) {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Помилка при виконанні запиту: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Дані отримані з URL:", data);
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
}

console.log("Завдання: 3 ==============================");
getDataFromUrl("https://swapi.dev/api/people/1");

async function postDataWithAuth(url, data, authToken) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authToken,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Response Data:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log("Завдання: 4 ==============================");
postDataWithAuth(
  "https://petstore.swagger.io/v2/store/order",
  {
    id: 0,
    petId: 0,
    quantity: 0,
    shipDate: "2023-07-23T19:28:06.229Z",
    status: "placed",
    complete: true,
  },
  "fsdodfa8sdg76adtf687ya8rufia8d7fasy6g"
);


//Завдання 5
async function* asyncGenerator() {
  let i = 0;
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i++;
  }
}

async function printFiveItems() {
  for await (const value of asyncGenerator()) {
    console.log(value);
    if (value === 4) break;
  }
}

console.log("Завдання: 5 ==============================");
printFiveItems();

//Завдання 6
async function getDataFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Дані з бази даних");
    }, 1000);
  });
}

async function getDataFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Дані з API");
    }, 800);
  });
}

async function getDataFromCache() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Дані з кешу");
    }, 600);
  });
}

async function* gatherData() {
  try {
    const dbData = await getDataFromDB();
    yield dbData;

    const apiData = await getDataFromAPI();
    yield apiData;

    const cacheData = await getDataFromCache();
    yield cacheData;
  } catch (error) {
    console.error(error);
  }
}

async function displayData() {
  const dataGenerator = gatherData();

  for (let i = 0; i < 3; i++) {
    const { value, done } = await dataGenerator.next();
    if (done) {
      break;
    }
    console.log(value);
  }
}

console.log("Завдання: 6 ==============================");
displayData();

//Завдання 7
function* countdownGenerator(start) {
  let count = start;
  while (count >= 0) {
    yield count;
    count--;
  }
}

console.log("Завдання: 7 ==============================");
const countdown = countdownGenerator(5);

let nextValue = countdown.next();
while (!nextValue.done) {
  console.log(nextValue.value);
  nextValue = countdown.next();
}
