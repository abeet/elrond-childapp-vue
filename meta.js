module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "service_id": {
      "type": "string",
      "required": true,
      "message": "子应用id（必须为英文，无空格及其他特殊字符）："
    },
    "service_name": {
      "type": "string",
      "required": true,
      "message": "子应用name（必须为中文，无空格）："
    },
    "name": {
      "type": "string",
      "required": true,
      "message": "项目名（可以与子应用id相同）："
    },
    "author": {
      "type": "string",
      "message": "作者："
    }
  },
  "filters": {
  },
  "completeMessage": "开始你的项目：\n\n  cd ./{{destDirName}}/client\n  yarn install\n  yarn run dev\n  yarn run start"
};
