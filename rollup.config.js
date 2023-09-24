import babel from "rollup-plugin-babel";
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
// CommonJS
// import commonjs from "rollup-plugin-commonjs";
import commonjs from '@rollup/plugin-commonjs';
// 预处理器
// import postcss from "rollup-plugin-postcss";
// import autoprefixer from "autoprefixer";
import css from 'rollup-plugin-css-only';
// import cssnano from "cssnano";
// 压缩使用
import {
  terser
} from "rollup-plugin-terser";
// 热更新
// 提供web服务器
import serve from 'rollup-plugin-serve';
// 监听包
import livereload from 'rollup-plugin-livereload';

const PACKAGE_NAME = `vueui-svelte`;

const plugins = [
  babel({
    exclude: "node_modules/**",
    runtimeHelpers: true,
  }),
  svelte({
    compilerOptions: {
      // enable run-time checks when not in production
      dev: process.env.NODE_ENV == 'dev'
    }
  }),
  css({ output: `${PACKAGE_NAME}.css` }),
  resolve({
    browser: true,
    dedupe: ['svelte']
  }),
  commonjs(),
  // postcss({
  //   plugins: [
  //     autoprefixer(),
  //     cssnano()
  //   ],
  // })
];

if(process.env.NODE_ENV == 'dev') {
  plugins.push(
    serve({
      contentBase: '', // 服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020 // 端口号，默认10001
    }),
    livereload('dist'), //watch dist目录，当目录中的文件发生变化时，刷新页面
  )
} else {
  plugins.push(removeConsole())
}

const sourcemap = process.env.NODE_ENV == 'dev' ? 'inline' : false

// 去除console插件
function removeConsole() {
  return {
    name: "remove-console",
    transform(code, id) {
      const Reg = /console\.log\(.*\)/gi;
      return code.replace(Reg, "");
    },
  };
}

export default {
  input: "./packages/index.js",
  output: [
    {
      // es6模块
      file: `./dist/${PACKAGE_NAME}.esm.js`,
      format: "es",
      sourcemap
    },
    {
      // es6模块 minify
      file: `./dist/${PACKAGE_NAME}.esm.min.js`,
      format: "es",
      plugins: [
        terser()
      ]
    },
    {
      // commonjs模块
      file: `./dist/${PACKAGE_NAME}.cjs.js`,
      format: "cjs",
      sourcemap
    },
    {
      // commonjs模块 minify
      file: `./dist/${PACKAGE_NAME}.cjs.min.js`,
      format: "cjs",
      plugins: [
        terser()
      ]
    },
    {
      // global模块
      file: `./dist/${PACKAGE_NAME}.global.js`,
      format: "iife",
      name: 'VeeUISvelte',
      sourcemap,
      globals: {
      }
    },
    {
      // global模块 minify
      file: `./dist/${PACKAGE_NAME}.global.min.js`,
      format: "iife",
      name: 'VeeUISvelte',
      plugins: [
        terser()
      ],
      globals: {
        
      }
    }
  ],
  plugins,
  external: [
    
  ]
};