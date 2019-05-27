# sdk
**sdk**为DS UI SDK，以```typescript```为基础,构建工具使用```gulp```。
## CLI
```npm run build```：将所有npm私有库所需要的文件生成到dist文件夹下。

## 文件结构

### dist文件夹
用于存放所有发布所需的文件。

### lib文件夹
用于存放所有的业务代码。

* **connector**： 基于axios封装的http请求和web socket。

### test文件夹
用于存放单元测试文件


目前通过 node test.js进行测试

### package.json
peerDependencies用于声明所有依赖库

