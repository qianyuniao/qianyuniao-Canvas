# qianyuniao-Canvas · 迁羽鸟画布

> 一个功能强大的 AI 无限画布创作工具，支持多模型图像生成、节点式工作流编排与智能素材管理。

[![Version](https://img.shields.io/badge/version-2026.09.15-blue)](https://github.com/qianyuniao/qianyuniao-Canvas)
[![Python](https://img.shields.io/badge/python-3.10+-yellow)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136+-009688)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE.txt)

---

## ✨ 功能特性

### 🎨 本地功能
| 模块 | 说明 |
|------|------|
| **文生图** | 输入提示词直接生成高质量图像 |
| **细节增强** | 对已有图像进行超分辨率增强、画质提升 |
| **图片编辑** | 图生图、局部重绘、风格迁移等编辑能力 |
| **角度控制** | 通过参考图控制生成图像的视角与姿态 |

### 🌐 在线与对话
- **在线生图**：接入在线 API 渠道，快速调用云端模型
- **GPT 对话**：内置 LLM 对话页，支持多轮对话与文件附件

### 🧠 无限画布 / 智能画布
- **节点式工作流**：拖拽式编辑，灵活组合文本、图像、LLM、视频节点
- **批量生成**：一键批量运行多节点、多参数
- **工作流导入导出**：支持 JSON 格式工作流分享与复用
- **实时协作**：WebSocket 支持多端画布状态同步

### 📦 素材库
- 统一管理生成结果、本地上传素材
- 支持 AI 自动打标（Caption）与分类
- 文件夹分组、批量移动/删除
- 批量采集、一键迁移到画布

### 🔌 多渠道 AI 接入
支持多种 AI 提供商，可自由增删配置：

| 渠道 | 协议 | 说明 |
|------|------|------|
| **ModelScope** | OpenAI 兼容 | 免费调用通义万相、Qwen 系列模型，支持 LoRA |
| **RunningHub** | RunningHub | GPT-Image-2、Sora、Seedance 等多模型工作流 |
| **火山引擎** | 火山方舟 | 字节跳动火山方舟平台接入 |
| **即梦 CLI** | Jimeng CLI | 本地 CLI 调用即梦（Dreamina）图像/视频模型 |
| **GPT Codex CLI** | Codex CLI | 调用 OpenAI Codex CLI（gpt-image-2、gpt-5.5） |
| **Gemini CLI** | Gemini CLI | Google Gemini 本地 CLI 调用 |
| **OpenAI 兼容** | OpenAI | 任意兼容 OpenAI 格式的 API 服务 |
| **本地 ComfyUI** | ComfyUI | 对接本地或远程 ComfyUI 实例，支持自定义工作流 |

---

## 🚀 快速开始

### 环境要求
- Python 3.10+
- Windows / macOS / Linux
- （可选）已配置的各类 AI API Key 或本地 ComfyUI 实例

### 方式一：一键启动（Windows）

```bash
# 首次使用，安装依赖
安装依赖.bat

# 启动服务
run.bat
```

### 方式二：一键启动（macOS）

```bash
# 首次使用，修复权限
右键 → 打开 mac-修复权限.command

# 安装依赖
bash mac-安装依赖.sh

# 启动服务
双击 mac-启动服务.command
```

### 方式三：手动启动

```bash
# 1. 安装依赖
pip install -r requirements.txt
pip install "uvicorn[standard]"

# 2. 启动服务
python main.py
```

### 访问服务
启动后浏览器自动打开：
- **本机访问**：http://127.0.0.1:5050/
- **局域网访问**：http://<你的IP>:5050/

按 `Ctrl+C` 停止服务。

---

## 📁 项目结构

```
qianyuniao-Canvas/
├── main.py                     # FastAPI 主程序入口
├── requirements.txt            # Python 依赖列表
├── run.bat                     # Windows 启动脚本
├── 安装依赖.bat                 # Windows 依赖安装
├── mac-启动服务.command        # macOS 启动脚本
├── mac-安装依赖.sh             # macOS 依赖安装
│
├── python/                     # 内置 Python 运行时（Windows 便携版）
├── packages/                   # 离线依赖包目录
│
├── static/                     # 前端静态文件
│   ├── index.html              # 主工作台（导航壳）
│   ├── zimage.html             # 文生图页
│   ├── enhance.html            # 细节增强页
│   ├── klein.html              # 图片编辑页
│   ├── angle.html              # 角度控制页
│   ├── online.html             # 在线生图页
│   ├── gpt-chat.html           # GPT 对话页
│   ├── canvas.html             # 无限画布页
│   ├── smart-canvas.html       # 智能画布页
│   ├── canvas-list.html        # 画布列表/项目管理
│   ├── asset-manager.html      # 素材库
│   ├── api-settings.html       # API 配置页
│   ├── comfyui-settings.html   # ComfyUI 工作流设置
│   ├── css/                    # 样式表
│   ├── js/                     # 前端脚本（含 i18n 多语言）
│   ├── images/                 # 图片资源
│   ├── vendor/                 # 第三方前端库（Tailwind、Lucide、Three.js）
│   └── runninghub/             # RunningHub 工作流配置与缩略图
│
├── workflows/                  # 预置 ComfyUI 工作流 JSON
│   ├── Z-Image.json            # 通义 Z-Image 文生图
│   ├── Z-Image-Enhance.json    # 图像增强
│   ├── Flux2-Klein.json        # FLUX.2 Klein
│   ├── MiniMax_H3.json         # MiniMax 视频
│   ├── LTXDirectorv2-API.json  # LTX Director 视频
│   └── ...
│
├── CLI/                        # 各类 CLI 工具安装脚本
│   ├── windows/jimeng/         # 即梦 CLI Windows 安装器
│   ├── windows/openai/         # Codex CLI Windows 安装器
│   ├── windows/gemini/         # Gemini CLI Windows 安装器
│   └── macos/                  # macOS 对应安装器
│
├── tools/                      # 周边工具
│   ├── chrome-local-asset-importer/   # Chrome 扩展：本地素材导入器
│   └── photoshop-asset-connector/     # Photoshop 连接器插件
│
├── tests/                      # 测试脚本
│   └── test_canvas_log_cleanup.py
│
├── data/                       # 运行时数据目录（自动生成）
│   ├── canvases/               # 画布存储
│   ├── conversations/          # 对话记录
│   ├── media_previews/         # 媒体预览缓存
│   ├── asset_library.json      # 素材库索引
│   ├── api_providers.json      # API 渠道配置
│   └── ...
│
├── assets/                     # 用户素材目录（自动生成）
│   ├── uploads/                # 上传素材
│   ├── input/                  # 生成输入
│   ├── output/                 # 生成输出
│   └── library/                # 素材库文件夹
│
└── API/.env                    # API Key 存储文件（首次运行创建）
```

---

## ⚙️ 配置说明

### API 渠道配置
启动后进入 **API 设置** 页（左下角），可图形化配置各类渠道：
1. 选择 **添加平台** 或编辑已有平台
2. 填写 `Base URL`、选择 `协议`、粘贴 `API Key`
3. 点击 **拉取模型列表** 自动填充可用模型
4. 保存后返回对应页面即可使用

### ModelScope 快速接入
1. 注册 [ModelScope](https://modelscope.cn/) 账号
2. 在个人中心获取 API Key
3. 在 API 设置的 ModelScope 卡片中粘贴 Key
4. 可免费使用通义 Z-Image、Qwen-Image、FLUX.2-Klein 等模型

### RunningHub 工作流
1. 注册 [RunningHub](https://www.runninghub.ai/) 并获取 API Key
2. 在 API 设置中填写 RunningHub Key
3. 内置了若干预置 AI 应用与工作流，可直接在画布中使用

### 本地 ComfyUI
1. 启动 ComfyUI（默认地址 `127.0.0.1:8188`）
2. 进入 **更多设置 → 工作流设置** 导入自定义 JSON
3. 在本地功能页或画布节点中直接调用

---

## 🔧 常用脚本与工具

| 文件 | 用途 |
|------|------|
| `run.bat` / `mac-启动服务.command` | 一键启动服务，3 秒后自动打开浏览器 |
| `安装依赖.bat` / `mac-安装依赖.sh` | 优先离线安装，失败后回退在线安装 |
| `安装即梦CLI.bat` / `.command` | 一键安装即梦（Dreamina）CLI |
| `登录即梦CLI.bat` / `.command` | 登录即梦账号以使用 CLI 能力 |
| `CLI/windows/openai/1-install_openai_codex_cli.bat` | 安装 OpenAI Codex CLI |
| `CLI/windows/gemini/1-install_gemini_cli.bat` | 安装 Google Gemini CLI |
| `tools/chrome-local-asset-importer/` | Chrome 扩展：一键导入网页图片到素材库 |
| `tools/photoshop-asset-connector/` | UXP 插件：PSD 图层直连画布素材库 |

---

## 🛠️ 开发指南

### 后端 API 速览
核心路由（完整列表见 [main.py](file:///d:/02_MyWorkSpace/我的项目开发/项目测试/qianyuniao-Canvas/main.py)）：

```
页面路由:
  GET  /                          # 工作台首页
  GET  /static/*                  # 静态文件

应用基础:
  GET  /api/app-info              # 应用版本信息
  GET  /api/check-update          # 检查更新
  POST /api/update-from-github    # GitHub/ModelScope 一键更新

渠道与模型:
  GET  /api/providers             # 获取所有 API 渠道配置
  PUT  /api/providers             # 保存渠道配置
  GET  /api/providers/{id}/fetch-models
  POST /api/providers/test-connection

图像 / 视频 / LLM:
  POST /api/online-image          # 在线生图
  POST /api/canvas-image-tasks    # 画布批量图像任务
  POST /api/canvas-video          # 视频生成
  POST /api/canvas-llm            # 画布 LLM 调用

画布与素材:
  GET  /api/canvases              # 画布列表
  POST /api/canvases              # 新建画布
  GET  /api/canvases/{id}         # 画布数据
  GET  /api/local-assets          # 素材库列表
  POST /api/upload                # 通用上传

RunningHub:
  POST /api/runninghub/submit             # 提交 AI 应用
  POST /api/runninghub/workflow-submit    # 提交工作流

实时通信:
  WS   /ws/stats                  # 在线状态、实时广播
```

### 前端开发
- 纯静态页面，无需构建工具，直接编辑 `static/` 下的 HTML/CSS/JS
- 样式使用 Tailwind CDN + 自定义 CSS 变量主题
- 多语言：`static/js/i18n/` 各模块独立语言包
- 主题：`static/js/theme.js` 统一管理明暗模式

---

## ❓ 常见问题

### Q1: Windows 双击启动无反应
确认已先运行 `安装依赖.bat`，或手动执行 `pip install -r requirements.txt`。

### Q2: 提示 Python 未找到
- Windows：将项目自带的 `python/` 文件夹放在项目根目录
- macOS：`brew install python@3.10` 或官网下载安装

### Q3: 依赖安装失败 / 网络超时
- 项目提供了离线依赖包 `packages/`，`安装依赖.bat` 会优先尝试离线安装
- 或使用国内镜像：`pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt`

### Q4: 生成时提示 Key 无效
进入 **API 设置** 页：
1. 检查对应平台的 Key 是否粘贴正确（注意不要有多余空格）
2. 点击 **测试连接** 按钮
3. 必要时重新拉取模型列表

### Q5: macOS 提示"无法验证开发者"
右键点击 `.command` 文件 → 选择 **打开** → 再点击 **打开** 即可；或在系统设置 → 隐私与安全性 中点击 **仍要打开**。

### Q6: 本地 ComfyUI 连接失败
- 确认 ComfyUI 已启动且监听 `127.0.0.1:8188`
- 如需修改地址，在 `API/.env` 中设置 `COMFYUI_INSTANCES=ip1:port1,ip2:port2`

---

## 📝 更新日志
版本历史与更新内容见 `static/update-notes.json`，应用内也会自动检查并提示更新。

---

## 🧑‍💻 开源协议
本项目遵循 MIT License 发布，详见各源码文件头部。

- **GitHub**：https://github.com/qianyuniao/qianyuniao-Canvas
- **ModelScope Studio**：https://www.modelscope.cn/studios/qianyuniao/qianyuniao-Canvas

欢迎 Star、提 Issue 与 PR！
