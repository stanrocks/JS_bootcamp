// shows real applied styles

const li = document.querySelector(li);

const compStyles = getComputedStyle(li); // returns CSS Style Declaration

compStyles.color; // rgb(128, 0, 128)
compStyles.font; // "60px"
