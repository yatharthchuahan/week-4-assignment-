function QAItem(question, answer) {
    this.question = question;
    this.answer = answer;
    this.isOpen = false;
    this.element = null;
}

QAItem.prototype.render = function() {
    var itemDiv = document.createElement('div');
    itemDiv.className = 'faq-item';
    
    var qDiv = document.createElement('div');
    qDiv.className = 'question';
    qDiv.innerHTML = '<span class="icon">+</span>' + this.question;
    
    qDiv.onclick = this.toggle.bind(this);
    
    var aDiv = document.createElement('div');
    aDiv.className = 'answer';
    aDiv.innerHTML = '<p>' + this.answer + '</p>';
    
    itemDiv.appendChild(qDiv);
    itemDiv.appendChild(aDiv);
    
    this.element = itemDiv;
    return itemDiv;
};

QAItem.prototype.toggle = function() {
    this.isOpen = !this.isOpen;
    
    if(this.element) {
        if(this.isOpen) {
            this.element.className = 'faq-item open';
        } else {
            this.element.className = 'faq-item';
        }
    }
};

window.onload = function() {
    var faqItems = [
        new QAItem("What is OOP in JavaScript?", "Object Oriented Programming uses classes and objects to organize code."),
        new QAItem("How do you create a class?", "Use 'function ClassName() {}' as constructor and prototype for methods."),
        new QAItem("Why use classes?", "Classes keep related data and functions together, making code easier to manage."),
        new QAItem("What is 'this' in a class?", "'this' refers to the current object instance.")
    ];
    
    var container = document.getElementById('faq-list');
    for(var i = 0; i < faqItems.length; i++) {
        container.appendChild(faqItems[i].render());
    }
};