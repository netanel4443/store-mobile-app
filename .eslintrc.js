module.exports = {
  root: true,
  extends: '@react-native-community',

  "prettier/prettier": ["error", {
    "endOfLine":"auto"
  }],
  
},
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}


