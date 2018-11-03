// Dynamically loads questions to DOM

const questions = [
    'Your mind is always buzzing with unexplored ideas and plans.',
    'Generally speaking, you rely more on your experience than your imagination.',
    'You find it easy to stay relaxed and focused even when there is some pressure.',
    'You rarely do something just out of sheer curiosity.',
    'People can rarely upset you.',
    'It is often difficult for you to relate to other people’s feelings.',
    'In a discussion, truth should be more important than people’s sensitivities.',
    'You rarely get carried away by fantasies and ideas.',
    'You think that everyone’s views should be respected regardless of whether they are supported by facts or not.',
    'You feel more energetic after spending time with a group of people.'
];
const maxValue = 5;

class Option {
    constructor(props) {
        this.node = document.createElement('OPTION');
        if (props) {
            for (let prop in props) {
                this.node[prop] = props[prop];
            }
        }
        return this.node;
    }
}
class Select {
    constructor(max) {
        this.node = document.createElement('SELECT');
        const defaultOption = new Option({
            text: 'Select an Option',
            value: '',
            selected: true,
            disabled: true
        });
        this.add(defaultOption);
        this.addOptions(max);
        return this.node;
    }
    addOptions(max) {
        this.node.options;
        let props = {};
        for (let i = 1; i <= max; i++) {
            if (i > 1 && i < max) {
                props.text = i;
                props.value = i;
            } else {
                props.text = i + ` (Strongly ${(i == 1) ? 'Disagree' : 'Agree'})`,
                    props.value = i;
            }
            this.add(new Option(props));
        }
    }
    add(option, i) {
        this.node.options.add(option, i);
    }
}
class Question {
    constructor(text, num, select) {
        this.node = document.createElement('DIV');
        this.node.classList.add('q' + num);

        this.node.append(
            document.createElement('H2'),
            document.createElement('H3'),
            select
        );
        this.node.childNodes[0].innerText = 'Question ' + num;
        this.node.childNodes[1].innerText = text;
        return this.node;
    }
}

const questionsDiv = document.querySelector('.questions');
questions.forEach((qText, i) => {
    questionsDiv.appendChild(
        new Question(
            qText,
            i + 1,
            new Select(maxValue)
        )
    );
})