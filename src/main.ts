// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';

export default function (context) {
	const { electron } = context;
	const { ipcMain } = electron;

	LocalMain.getServiceContainer().cradle;

	LocalMain.addIpcAsyncListener('get-random-count', async () => {
		return Math.floor(Math.random() * 100);
	});

	// ipcMain.on('vscode-addon-open-browser', async (event, url) => {
	// 	LocalMain.sendIPCEvent('instructions');
	// 	LocalMain.getServiceContainer().cradle.localLogger.log('info', `Saving count ${count} for site ${siteId}.`);
	// 	LocalMain.SiteData.updateSite(siteId, {
	// 		id: siteId,
	// 		count,
	// 	});
	// });
}
