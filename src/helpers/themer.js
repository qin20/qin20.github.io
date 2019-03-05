/**
 * @desc 主题适配函数
 * @author 秦缘斌 <a591737386@163.com, qinyuanbin@corp.netease.com>
 * @date 2019/02/25 21:17:06
 */
export default (configs) => {
    return (props) => {
        const { theme } = props;
        const value = configs[theme.name] || configs.default || '';

        if (typeof value === 'function') {
            return value(props);
        } else {
            return value;
        }
    };
};
