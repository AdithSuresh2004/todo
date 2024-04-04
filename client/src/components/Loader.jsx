import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="text-center">
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      </div>
    </div>
  );
};

export default Loader;
