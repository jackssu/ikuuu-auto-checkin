## iKuuu 定时自动签到00

[![详细文档](https://img.shields.io/badge/详细文档-blue)](https://ewigl.github.io/notes/posts/programming/github-actions/)

[![IKUUU-Auto-Checkin](https://github.com/ewigl/ikuuu-auto-checkin/actions/workflows/Checkin.yml/badge.svg)](https://github.com/ewigl/ikuuu-auto-checkin/actions/workflows/Checkin.yml)

### 使用

1. Fork 仓库。
2. 启用 Actions。
3. 设置环境变量。

### 环境变量

- **Environments**: `IKUUU`

- **Secrets**:`EMAIL`, `PASSWD`, `HOST`（可选）

- 由于 iKuuu 经常更换域名，添加 HOST 环境变量，默认为`ikuuu.one`，可不设置。若域名更改，在 Secrets 中设置 HOST 的值为对应域名即可。
