import path from 'path';
import { OpenVSCodeButton } from './OpenVSCodeButton';

export default function (context) {
	const { React, hooks } = context;

	const stylesheetPath = path.resolve(__dirname, '../style.css');

	hooks.addContent('stylesheets', () => <link rel="stylesheet" key="notes-addon-styleesheet" href={stylesheetPath} />);

	// Create the route/page of content that will be displayed when the menu option is clicked
	hooks.addContent('SiteInfoOverview_TableList', (site) => (
		<OpenVSCodeButton site={site} />
	));
}
