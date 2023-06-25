let config = {};
if (process.env.NODE_ENV == 'production' || true) { //生产环境
	config = {
		// // ajax地址
		// baseUrl: 'https://app.bbacoin.com',
		// // 图片地址 （暂时无用）
		// imgUrl: 'https://app.bbacoin.com/storage',
		// // socket地址
		// socketUrl: 'wss://app.bbacoin.com/ws1',
		// socketUrl1: 'wss://app.bbacoin.com/ws2',
		// // pc端地址
		// pcUrl: 'https://www.bbacoin.com',
		// ajax地址
		baseUrl: 'https://xapi.pakepe.com',
		// 图片地址 （暂时无用）
		imgUrl: 'https://app.bitcoinified.com/storage',
		// socket地址
		newSocketUrl: 'wss://xapi.pakepe.com/ws',
		socketUrl: 'wss://app.bitcoinified.com/ws1',
		socketUrl1: 'wss://app.bitcoinified.com/ws2',
		// pc端地址
		pcUrl: 'https://www.bitcoinified.com',
		// pc端地址
		// pcUrl: 'https://www.bbacoin.com',
		// app名称
		appName: 'Exchange',
		// 版本
		version: '1.0.0',
		// 移动端地址
		mobile: 'https://h5.bitcoinified.com'
	};
} else { //开发环境
	config = {

		baseUrl: 'https://app.bitcoinified.com',
		imgUrl: 'https://app.bitcoinified.com/upload',
		socketUrl: 'wss://app.bitcoinified.com:2346/',
		socketUrl1: 'wss://app.bitcoinified.com:2348/',
		// pc端地址
		pcUrl: 'http://app.bitcoinified.com',
		// baseUrl: 'https://app.bbacoin.com',
		// imgUrl: 'https://app.bbacoin.com/upload',
		// socketUrl: 'ws://app.bbacoin.com:2346/',
		// socketUrl1: 'ws://app.bbacoin.com:2348/',
		// // pc端地址
		// pcUrl: 'http://www.bbacoin.comp',
		// app名称
		appName: '本地开发',
		// 版本
		version: '0.0.0',
		// 移动端地址
		mobile: ''
	}

}
export default config;
