"use strict";

var React = require('react');

var OrgChart = function OrgChart(_ref) {
    var tree = _ref.tree,
        NodeComponent = _ref.NodeComponent;


    var renderChildren = function renderChildren(node) {

        var hasSiblingRight = function hasSiblingRight(childIndex) {
            return (node.children || []).length > childIndex + 1;
        };

        var hasSiblingLeft = function hasSiblingLeft(childIndex) {
            return childIndex > 0;
        };

        let extra_class = "";
        if (node.hide_children == true) {
            extra_class = " hidden";
        }

        var nodeLineBelow = React.createElement(
            "td",
            {colSpan: (node.children || []).length * 2, className: "nodeGroupCellLines" + extra_class},
            React.createElement(
                "table",
                {className: "nodeLineTable" + extra_class},
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement("td", {
                            colSpan: 2,
                            className: "nodeLineCell nodeGroupLineVerticalMiddle" + extra_class
                        }),
                        React.createElement("td", {colSpan: 2, className: "nodeLineCell" + extra_class})
                    )
                )
            )
        );

        var childrenLinesAbove = (node.children || []).map(function (child, childIndex) {
            return React.createElement(
                "td",
                {colSpan: "2", className: "nodeGroupCellLines" + extra_class, key: childIndex},
                React.createElement(
                    "table",
                    {className: "nodeLineTable" + extra_class},
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement("td", {
                                colSpan: 2,
                                className: "nodeLineCell nodeGroupLineVerticalMiddle" + extra_class + (hasSiblingLeft(childIndex) ? ' nodeLineBorderTop' : '')
                            }),
                            React.createElement("td", {
                                colSpan: 2,
                                className: "nodeLineCell" + extra_class + (hasSiblingRight(childIndex) ? " nodeLineBorderTop" : "")
                            })
                        )
                    )
                )
            );
        });

        var children = (node.children || []).map(function (child, childIndex) {
            return React.createElement(
                "td",
                {colSpan: "2", className: "nodeGroupCell" + extra_class, key: childIndex},
                renderChildren(child)
            );
        });

        return React.createElement(
            "table",
            {className: "orgNodeChildGroup"},
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        {className: "nodeCell", colSpan: (node.children || []).length * 2},
                        React.createElement(NodeComponent, {node: node, replace_node: _ref.replace_node})
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    (node.children || []).length > 0 && nodeLineBelow
                ),
                React.createElement(
                    "tr",
                    null,
                    childrenLinesAbove
                ),
                React.createElement(
                    "tr",
                    null,
                    children
                )
            )
        );
    };

    return React.createElement(
        "div",
        {className: "reactOrgChart"},
        renderChildren(tree)
    );
};

module.exports = OrgChart;