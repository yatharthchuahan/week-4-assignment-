class QAItem {
  constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.isOpen = false;
    this.el = null; 
  }

  render() {
    const card = document.createElement('div');
    card.className = 'qa-card';

    card.innerHTML = `
      <div class="qa-question" tabindex="0" role="button" aria-expanded="false">
        <h3>${this.question}</h3>
        <span class="toggle-icon">+</span>
      </div>
      <div class="qa-answer">
        <p>${this.answer}</p>
      </div>
    `;

    this.el = card;

    const questionEl = card.querySelector('.qa-question');

    questionEl.addEventListener('click', () => this.toggle());

    questionEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });

    return card;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateDOM();
  }

  updateDOM() {
    if (!this.el) return;

    const btn = this.el.querySelector('.qa-question');

    if (this.isOpen) {
      this.el.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      this.el.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }
}

const questions = [
  {
    question: "What is OOP in JavaScript?",
    answer: "OOP stands for Object-Oriented Programming. It's a way of writing code where you create 'classes' that act like blueprints, and then make individual 'objects' from those blueprints. Each object has its own data and its own functions (called methods). It helps keep code organised, especially when you have a lot of similar things to manage."
  },
  {
    question: "What is a class and how do you make one?",
    answer: "A class is like a template for creating objects. You define it using the 'class' keyword, add a constructor() to set up properties, and then write methods inside it. For example: class QAItem { constructor(q, a) { this.question = q; this.answer = a; } }. After that you can do 'new QAItem(...)' to create as many instances as you want."
  },
  {
    question: "Why not just use regular functions instead of a class?",
    answer: "You could, and for small things it's fine. But a class keeps related data and behaviour together in one place. If you had 20 Q&A pairs managed with plain variables and functions, things would get messy fast. The class approach means each QAItem knows how to render itself, toggle itself, and track its own open/closed state — nothing leaks out."
  },
  {
    question: "How does the show/hide animation work?",
    answer: "The answer div starts with max-height: 0 and opacity: 0, so it's invisible. When the card gets the 'open' class added by JavaScript, max-height jumps to 500px and opacity goes to 1. Because those properties have CSS transitions on them, the browser smoothly animates between the two states. It's a common trick since you can't transition height: auto directly."
  },
  {
    question: "What does the toggle() method actually do?",
    answer: "It flips the isOpen boolean — if it was false it becomes true, if true it becomes false. Then it calls updateDOM() which checks that boolean and either adds or removes the 'open' CSS class from the card element. That class change is what triggers the CSS animation and swaps the icon colour."
  },
  {
    question: "How are the cards added to the page dynamically?",
    answer: "The Q&A data lives in a plain array of objects at the bottom of the script. A .map() call loops through it and creates a new QAItem instance for each entry. Then forEach() calls .render() on each one, which builds the HTML and returns a DOM node, and that node gets appended into the faqContainer div. No Q&A HTML is written by hand in the HTML file."
  }
];

const container = document.getElementById('faqContainer');
const items = questions.map((q, i) => new QAItem(i + 1, q.question, q.answer));
items.forEach(item => container.appendChild(item.render()));
