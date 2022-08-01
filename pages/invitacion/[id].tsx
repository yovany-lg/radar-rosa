import * as React from 'react';
import Head from 'next/head';
import styles from './Invitation.module.css';
import { supabase } from '@/lib/supabase';

const Invitation = ({ user }: any) => {
  const [confirmed, setStatus] = React.useState(false);
  const [code, setCode] = React.useState('');
  return (
    <div className={styles.container}>
      <Head>
        <title>Radar Violeta</title>
        <meta
          name="description"
          content="Radar violeta - tu guardian digital."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!confirmed ? (
          <div className={styles.grid}>
            <h1 className={styles.title}>Radar Violeta</h1>

            <h2>
              Hola {user.contactName}, <b>{user.name}</b> te ha invitado como su
              contacto en Radar violeta.
            </h2>
            <input
              placeholder="Ingresa tu numero teléfonico"
              className={styles.input}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <p>
              Para aceptar agrega tu numero de teléfono, deben de ser 10
              números.
            </p>
            <button
              className={styles.button}
              onClick={() => {
                if (code !== user.contactPhoneNumnber) {
                  alert('El numero de telefono no coincide');
                } else {
                  setStatus(true);
                }
              }}
            >
              Confirmar invitación
            </button>
          </div>
        ) : (
          <h1 className={styles.title}>Gracias por confirmar. 😊</h1>
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const { id } = ctx.query;

  // hack because uuid is not working
  const { data, error } = await supabase.from('Users').select('*');

  const user = data?.find((user) => {
    return user.contacts.id1 === id || user.contacts.id2 === id;
  });
  const contact =
    user?.contacts.id1 === id
      ? {
          name: user.contacts.contact1Name,
          phoneNumnber: user.contacts.contact1Phone,
        }
      : {
          name: user.contacts.contact2Name,
          phoneNumnber: user.contacts.contact2Phone,
        };

  return {
    props: {
      user: user
        ? {
            name: user.firstName + ' ' + user.lastName,
            contactName: contact.name,
            contactPhoneNumnber: contact.phoneNumnber,
          }
        : null,
    },
  };
}

export default Invitation;
