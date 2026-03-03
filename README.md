# Reversi by Prainy

这是一个基于React的黑白棋实现

### 目标完成情况
- [x] 1. 制作8×8的棋盘。
- [x] 2. 棋盘上可以落子。
- [x] 3. 黑落子之后，白落子。
- [x] 4. 落子规则：把自己颜色的棋子放在棋盘的空格上，而当自己放下的棋子在横、竖、斜八个方向内有一个自己的棋子，则被夹在中间的全部翻转会成为自己的棋子。并且，只有在可以翻转棋子的地方才可以下子。
- [x] 5. 反转规则：新落下的棋子与棋盘上已有的同色棋子间，对方被夹住的所有棋子都要翻转过来。可以是横着夹，竖着夹，或是斜着夹。夹住的位置上必须全部是对手的棋子，不能有空格。
- [x] 6. 胜负规则：棋盘下满，棋子多方获胜；未下满时，一方棋子被吃光，对方获胜。
- [x] 7. 轮候规则：除非至少翻转了对手的一个棋子，否则就不能落子。如果一方没有合法棋步，也就是说不管他下到哪里，都不能至少翻转对手的一个棋子，那他这一轮只能弃权，而由他的对手继续落子直到他有合法棋步可下。
- [ ] 8. 完成棋子反转的动画。
- [ ] 9. AI：初级，随机落子；中级，按照金角银边方式落子；高级，强化学习落子。

### 代码库指南
本仓库使用了Vite作为Bundler，开发过程中包管理为pnpm，clone仓库后，可以使用以下命令来安装依赖：

```bash
pnpm install
```

启动开发服务器：
```bash
pnpm run dev
```
（注：不保证npm和yarn能正常工作）

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
