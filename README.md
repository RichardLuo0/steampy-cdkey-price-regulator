# steampy-cdkey-price-regulator
自动调整所有steampy上所上架的cdkey价格，不必手动调节

运行此工具将会把 https://www.steampy.com/ 上你所上架的cdkey价格降低到市场最低价，方便卖家快速出售cdkey

# 运行说明
1. 必须安装nodejs
2. clone本项目并cd到项目下
3. npm run build
4. node . 加上你需要的参数，例如node . -token xxxx -step true
5. 第一次运行时带上accessToken，之后会自动保存
    - 获取方法：
    - 访问 https://www.steampy.com/ 
    - 确保登录状态，找到cookies（chrome下就是上面地址栏左边点一下）
    - 找到www.steampy.com
    - 找到accessToken复制内容部分

# 可选参数：
```
"-token": "要使用的accessToken，第一次输入后自动保存，默认为空",
"-spread": "期望设定为比最低价高多少,为负值时比最低价低多少，默认为0",
"-step": "是否对每一个游戏单独设定，true/false，默认为false",
"-cookiesPath": "token保存的相对路径，默认为当前目录下cookies.txt",
"-help": "显示帮助"
```  
