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
      "message": "子应用 id，必填，必须为英文，无空格及其他特殊字符"
    },
    "service_name": {
      "type": "string",
      "required": true,
      "message": "子应用 name，必填，必须为中文，无空格"
    },
    "author": {
      "type": "string",
      "message": "Author"
    }
  },
  "filters": {
  },
  "completeMessage": "开始你的项目：\n\n  cd ./{{destDirName}}/client\n  yarn install\n  yarn run dev\n  yarn run start"
};
