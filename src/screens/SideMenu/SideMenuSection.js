import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import StyleKit from "@Style/StyleKit"
import SideMenuCell from "@SideMenu/SideMenuCell"
import ThemedComponent from "@Components/ThemedComponent";

export default class SideMenuSection extends ThemedComponent {

  static BuildOption({text, key, iconDesc, dimmed, selected, onSelect, onLongPress}) {
    return { text, key, iconDesc, dimmed, selected, onSelect, onLongPress };
  }

  constructor(props) {
    super(props);
    this.state = {collapsed: props.collapsed};
  }

  toggleCollapse = () => {
    this.setState((prevState) => {
      return {collapsed: !prevState.collapsed};
    })
  }

  render() {
    let options = this.props.options || [];
    let collapsedLabel = options.length > 0 ? options.length + " Options" : "Hidden";
    return (
      <View style={this.styles.root}>
        <TouchableOpacity
          style={[this.styles.header, this.state.collapsed ? this.styles.collapsedHeader : null]}
          underlayColor={StyleKit.variable("stylekitBorderColor")}
          onPress={this.toggleCollapse}
        >
          <Fragment>
            <Text style={this.styles.title}>{this.props.title}</Text>
            {this.state.collapsed &&
              <Text style={this.styles.collapsedLabel}>{collapsedLabel}</Text>
            }
          </Fragment>
        </TouchableOpacity>

        {!this.state.collapsed &&
          <Fragment>
            {options.map((option) => {
              return <SideMenuCell
                text={option.text}
                key={option.key}
                iconDesc={option.iconDesc}
                dimmed={option.dimmed}
                selected={option.selected}
                onSelect={option.onSelect}
                onLongPress={option.onLongPress}
              />
            })}

            {this.props.children}
          </Fragment>
        }
      </View>
    )
  }

  loadStyles() {
    this.styles = {
      root: {
        paddingBottom: 6
      },
      header: {
        height: 22
      },
      collapsedHeader: {
        height: 50
      },
      title: {
        color: StyleKit.variables.stylekitInfoColor,
        fontSize: 13,
        fontWeight: "700"
      },

      collapsedLabel: {
        fontSize: 12,
        opacity: 0.7,
        marginTop: 3,
        color: StyleKit.variables.stylekitContrastForegroundColor
      }
    }
  }
}
