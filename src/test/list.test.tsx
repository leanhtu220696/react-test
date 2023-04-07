import { render, screen } from '@testing-library/react';

import DeviceList from '../pages/List/DeviceList';

test('renders learn label', async () => {
    render(<DeviceList />);
    const appText = screen.getByText('Imei');
    expect(appText).toBeInTheDocument();
});
