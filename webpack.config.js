module.exports = {
	output: {
		 libraryTarget: 'module'
	 },
	 externals: [
		 { pg: { commonjs: 'pg' } }
	 ],
 }