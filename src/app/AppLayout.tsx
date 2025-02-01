'use client';
import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { PanelLeftClose, PanelLeftOpen, Mail, TrendingUpDown, FileText, UserRoundCog } from 'lucide-react';
import { isMobile } from '../utils/isMobile';

const { Sider, Content } = Layout;

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const [selectedKey, setSelectedKey] = useState('1');
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Track window size
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial size
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Detect if the device is mobile
    useEffect(() => {
        const userAgent = navigator.userAgent || '';
        setIsMobileDevice(isMobile(userAgent));
    }, []);

    // Determine the filter value based on conditions
    let filterValue = 'none'; // Default filter value
    if (isMobileDevice && collapsed) {
        filterValue = 'blur(0px)';
    } else if (isMobileDevice && !collapsed) {
        filterValue = 'blur(5px)';
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Fixed Sider */}
            <Sider
                trigger={null}
                width={300}
                collapsible
                collapsed={collapsed}
                collapsedWidth={58}
                onMouseEnter={() => setCollapsed(false)} // Expand the sider when hovered
                onMouseLeave={() => setCollapsed(true)} // Collapse the sider when the mouse leaves
                style={{
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 1, // Ensure it stays above other content
                    backgroundColor: colorBgContainer,
                    transition: 'all 0.3s ease', // Smooth transition for collapsing/expanding
                }}
            >
                {/* Flex container for the Menu */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: 24 }}>
                    <Menu
                        theme="light"
                        mode="inline"
                        style={{ flex: 1, fontSize: '16px', fontWeight: 500 }}
                        selectedKeys={[selectedKey]} // Dynamically set the selected key
                        onClick={({ key }) => setSelectedKey(key)} 
                        items={[
                            {
                                key: 'Dashboard',
                                label: collapsed ? null : 'Dashboard',
                                type: 'group',
                                children: [
                                    { key: '1', icon: <Mail />, label:(<Link href="/dashboard/notifications" passHref>Notifications </Link>) },
                                    { key: '2', icon: <TrendingUpDown />, label: (<Link href="/dashboard/analyse-results" passHref>Analyse Results </Link>) },
                                    { key: '3', icon: <FileText />, label: (<Link href="/dashboard/resources" passHref>Resources </Link>) },
                                ],
                            },
                        ]}
                    />
                    {/* Account Management group at the bottom */}
                    <Menu
                        theme="light"
                        mode="inline"
                        style={{ fontSize: '16px', fontWeight: 500 }}
                        items={[
                            {
                                key: 'Account Management',
                                label: collapsed ? null : 'Account Management',
                                type: 'group',
                                children: [
                                    { key: '13', label: (<Link href="/dashboard/account" passHref>Manage Account </Link>) , icon: <UserRoundCog /> },
                                    { key: '14', label: (<Link href="/dashboard/account" passHref>Manage Account </Link>), icon: <UserRoundCog /> },
                                    
                                ],
                            },
                        ]}
                    />
                </div>
            </Sider>
            {/* Main Content */}
            <Layout style={{ marginLeft: collapsed ? 48 : 300 }}>
                <div style={{ position: 'fixed', zIndex: 1 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 44,
                            height: 44,
                            margin: 16,
                            backgroundColor: colorBgContainer,
                        }}
                    />
                </div>
                <Content
                    style={{
                        marginTop: 74, // Offset for the fixed Header
                        marginLeft: 16,
                        marginRight: 16,
                        padding: 2,
                        minHeight: '100vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflowY: 'auto',
                        filter: filterValue,
                        transition: 'filter 0.2s ease-in', // Add smooth blur transition
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;