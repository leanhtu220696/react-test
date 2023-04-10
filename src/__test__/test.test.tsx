import { render, screen } from '@testing-library/react';

import ManagerDevicePage from '@/pages/EquipmentManagement/DeviceList';

test('renders learn label', async () => {
    render(<ManagerDevicePage />);
    const appText = screen.getByText(/learn react/i);
    expect(appText).toBeInTheDocument();
});
