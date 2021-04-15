# zcl

目的：快速创建项目模板，其他项目组也可以通过该工具维护自己的项目模板
功能：持续添加中，提高开发效率
1. 下载模版。
  * 移动端UI组件库：zcl-ui
  * 移动端h5多页面模版：h5_template
2. zcl -v 查看脚手架版本信息
3. 下载移动端多页面的 page 模版
  * 下载目录名为invoice的页面模版：zcl clone invoice --pageName pageTemplate

### 命令
```
zcl init app-name
zcl create app-name
```

待优化：
1、下载文件目录、版本等信息要用户输入形成。输入信息合并到下载模版的package.json (完成)
2、快速删除已下载项目 (完成)
3、完善说明文档
4、推包。检查版本号，自动升级

功能开发：
1、自动生成router路由文件，无需手动配置
