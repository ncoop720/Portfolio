"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portfolioItems = [{
  href: "game-of-life/index.html",
  img: "game-of-life/gol_pic.png",
  text: "Mathematician John Conway's Game of Life"
}, {
  href: "simon-game/index.html",
  img: "simon-game/sg_pic.png",
  text: "Simon® Game"
}, {
  href: "wikipedia-viewer/index.html",
  img: "wikipedia-viewer/wv_pic.png",
  text: "Wikipedia Viewer"
}, {
  href: "tic-tac-toe/index.html",
  img: "tic-tac-toe/ttt_pic.png",
  text: "Tic-Tac-Toe"
}, {
  href: "#",
  img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  text: "Placeholder"
}, {
  href: "#",
  img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  text: "Placeholder"
}];

$(document).ready(function () {
  //add the three bar menu icon
  $("#nav").before('<button id="menu">☰</button>');

  //toggle side navigation when menu button is clicked
  $("#menu").click(function () {
    $("#nav").toggle();
  });

  //toggle side navigation when one of the navigation buttons is clicked
  $(".navListItem").click(function () {
    $("#nav").toggle();
  });

  //remove side navigation when window is resized
  $(window).resize(function () {
    if (window.innerWidth > 768) {
      $("#nav").removeAttr("style");
    }
  });

  //Navigation - Home Button
  $(".home").click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  //Navigation - Portfolio Button
  $(".portfolio").click(function () {
    $('html, body').animate({
      scrollTop: $("#forScrolling").offset().top
    }, 500);
  });

  //Navigation - Contact Button
  $(".contact").click(function () {
    $('html, body').animate({
      scrollTop: $("#forScrolling2").offset().top
    }, 500);
  });

  renderPortfolio(portfolioItems);
});

//function that contains a react component which renders the portfolio section of the website
function renderPortfolio(items) {
  var Portfolio = function (_React$Component) {
    _inherits(Portfolio, _React$Component);

    function Portfolio() {
      _classCallCheck(this, Portfolio);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Portfolio.prototype.render = function render() {
      var portItemList = items.map(function (project, i) {
        return React.createElement(
          "a",
          { className: "portfolioItem", href: project.href, target: "_blank" },
          React.createElement("img", { className: "portfolioImg", src: project.img }),
          React.createElement(
            "div",
            { className: "overlay" },
            React.createElement(
              "div",
              { className: "overlayText" },
              project.text
            )
          )
        );
      });

      return React.createElement(
        "div",
        null,
        portItemList
      );
    };

    return Portfolio;
  }(React.Component);

  ReactDOM.render(React.createElement(Portfolio, null), document.getElementById('projects'));
}
