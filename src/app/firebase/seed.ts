import * as firebase from "firebase/app";
import { environment } from "../../environments/environment";

const users = [
  {
    id: "548c4c38e",
    name: "Yoda-san",
    avatar: "https://ionicframework.com/docs/demos/api/list/avatar-yoda.png",
    email: "yodasan@ionicdemo.com",
    jobTitle: "Jedi Master",
  },
  {
    id: "4c38e906",
    name: "John Doe",
    avatar:
      "https://gravatar.com/avatar/dba6ba51111236f123441f5551234a7741?d=identicon&f=y",
    email: "john_doe@ionicdemo.com",
    jobTitle: "Junior BSE",
  },
  {
    id: "be161326",
    name: "Rey Skywalker",
    avatar: "https://ionicframework.com/docs/demos/api/list/avatar-rey.png",
    email: "reyrey@ionicdemo.com",
    jobTitle: "Jedi Junior",
  },
  {
    id: "61326adbb45656cf",
    name: "user123",
    avatar:
      "https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y",
    email: "user123@gmail.com",
    jobTitle: "Junior Developer",
  },
  {
    id: "bb45656cf1473",
    name: "Princess Leia",
    avatar: "https://ionicframework.com/docs/demos/api/list/avatar-leia.png",
    email: "princess_ley@google.com",
    jobTitle: "Senator General",
  },
];

const questions = [
  {
    id: "8c4ee1",
    title:
      'What is the difference of the word "interface" from a developer\'s perspective?',
    body:
      "<p>Originally, I thought that this term only stands for the graphical user interface.</p>",
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[0],
  },
  {
    id: "asd177q34",
    title: 'What does "abstract" mean in programming?',
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: -5,
    comments: 3,
    answers: 4,
    user: users[1],
  },
  {
    id: "fda1232",
    title: 'Is 移動 an appropriate translation for "migration" in terms of ...',
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[2],
  },
  {
    id: "zer234",
    title: 'How do I translate "Object" in the context of OOP taxonomy?',
    body: `<h1>I am h1</h1>
           <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
           <h2>This is an h2</h2>
           <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
           <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[3],
  },
  {
    id: "ecx345",
    title: 'How do you translate "Class" in programming terms?',
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[4],
  },
  {
    id: "hyr123",
    title:
      "How do you know when to use hiragana or katakana when translating implementation details?",
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[0],
  },
  {
    id: "1kyua124",
    title:
      "How do you know when to use hiragana or katakana when translating implementation details?",
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[1],
  },
  {
    id: "aadn4124",
    title:
      "How do you know when to use hiragana or katakana when translating implementation details?",
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[2],
  },
  {
    id: "udpw124124",
    title:
      "How do you know when to use hiragana or katakana when translating implementation details?",
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[3],
  },
  {
    id: "aaes6624",
    title:
      "How do you know when to use hiragana or katakana when translating implementation details?",
    body: `<h1>I am h1</h1>
          <p>This is the content. And i am not that long but before anything else, Not long ago a longer version among the longest possible long value to be displayed in a long gibberish this is.</p>
          <h2>This is an h2</h2>
          <img src="https://gravatar.com/avatar/dba6ba5_c566f943241fb9cd9ada7741?d=identicon&f=y"/>
          <p>And the second paragraph to add another example.</p>`,
    votes: 45,
    comments: 3,
    answers: 4,
    user: users[4],
  },
];

export default function seed() {
  if (!firebase.apps.length) {
    firebase.initializeApp(environment.firebase);
  }

  const firestore = firebase.firestore();

  const qref = firestore.collection("questions");
  const uref = firestore.collection("users");

  const batch = firestore.batch();

  users.forEach((user) => {
    batch.set(uref.doc(user.id), user);
  });

  questions.forEach((question) => {
    batch.set(qref.doc(question.id), question);
  });

  return batch
    .commit()
    .then((response) => console.info("Seeding data completed.", response));
}
