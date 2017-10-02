"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portfolioItems = [{ href: "game-of-life/index.html", img: "game-of-life/gol_pic" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }, { href: "#", img: "https://images.pexels.com/photos/464317/pexels-photo-464317.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" }];

$(document).ready(function () {

  $("#home").click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  $("#portfolio").click(function () {
    $('html, body').animate({
      scrollTop: $("#forScrolling").offset().top
    }, 500);
  });

  $("#contact").click(function () {
    $('html, body').animate({
      scrollTop: $("#forScrolling2").offset().top
    }, 500);
  });

  renderPortfolio(portfolioItems);
});

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
          { href: project.href, target: "_blank" },
          React.createElement("img", { className: "portfolioItem", src: project.img })
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
