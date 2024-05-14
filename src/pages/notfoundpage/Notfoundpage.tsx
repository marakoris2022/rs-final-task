import './notfoundpage.scss';
import pic from '../../../public/images/404.jpeg';

export default function Notfoundpage() {
  return (
    <main>
      <section className={'container'}>
        <img className={'image-404'} src={pic} alt="404"></img>
      </section>
    </main>
  );
}
