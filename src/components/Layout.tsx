import { GithubFilled, InfoCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProLayout, SettingDrawer, ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import defaultProps from '../router/index';
import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';
export default () => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        layout: 'side',
    });

    const [pathname, setPathname] = useState('/');
    const router: any = {
        path: defaultProps[0].path,
        routes: defaultProps[0].children,
    };
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                siderWidth={216}
                bgLayoutImgList={[
                    {
                        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                        left: 85,
                        bottom: 100,
                        height: '303px',
                    },
                    {
                        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                        bottom: -68,
                        right: -45,
                        height: '303px',
                    },
                    {
                        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                        bottom: 0,
                        left: 0,
                        width: '331px',
                    },
                ]}
                route={router}
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    title: '七妮妮',
                    size: 'small',
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <InfoCircleFilled key="InfoCircleFilled" />,
                        <QuestionCircleFilled key="QuestionCircleFilled" />,
                        <GithubFilled key="GithubFilled" />,
                    ];
                }}
                menuItemRender={(item: any, dom) => (
                    <div onClick={() => { setPathname(item.path || '/') }}>
                        <Link to={item.path}>
                            <div> {dom} </div>
                        </Link>
                    </div>

                )}
                {...settings}
            >
                <PageContainer>
                    <ProCard
                        style={{
                            height: '100vh',
                            minHeight: 800,
                        }}
                    >
                        <Outlet />
                        <div />
                    </ProCard>
                </PageContainer>
            </ProLayout>
            <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams={false}
            />
        </div>
    );
};