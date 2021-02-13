module.exports = {
	chainWebpack: (config) => {
		// Pug Loader
		config.module
			.rule('pug')
			.test(/\.pug$/)
			.use('pug-plain-loader')
			.loader('pug-plain-loader')
			.end();
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/scss/vars.scss";`,
			},
		},
	},
	filenameHashing: false,
	devServer: {
		port: 8005,
		setup(app) {
			app.post('*', (req, res) => {
				res.redirect(req.originalUrl);
			});
		}
	}
};
