import { useEffect, useState } from 'react';
import { Plant } from '../types/Plant';
import apiClient from '../api/apiClient';
import { useParams } from 'react-router-dom';
import "../styles/PageStyle.css"

const PlantsPage = () => {
    const [data, setData] = useState(Array<Plant>);
    const [nev, setNev] = useState('');
    const [evelo, setEvelo] = useState(Boolean);
    const [kategoria, setKategoria] = useState('');
    const [ar, setAr] = useState(0);

    useEffect(() => {
        apiClient
            .get('/plants')
            .then((response) => setData(response.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const hozzaad = () => {
        const plant = {
            nev,
            evelo,
            kategoria,
            ar,
        } as Plant;

        apiClient
            .post('/plants', plant)
            .then((response) => {
                switch (response.status) {
                    case 201:
                        alert('Növény sikeresen létrehozva');
                        window.location.reload();
                        break;
                    case 400:
                        alert('Bad request');
                        break;
                    default:
                        alert('Hiba keletkezett');
                }
            })
            .catch((err) => console.error(err));
    };

    const torol = (id?: number) => {
        apiClient
            .delete(`/plants/${id}`)
            .then((response) => {
                switch (response.status) {
                    case 204:
                        window.location.reload();
                        break;
                    case 404:
                        alert('A növény nem található');
                        break;
                    default:
                        alert('Hiba keletkezett!');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <body>
            <div id='container'>
                <div id='tablazat'>
                    <table>
                        <tr>
                            <td>ID</td>
                            <td>Név</td>
                            <td>Évelő-e?</td>
                            <td>Kategória</td>
                            <td>Ár</td>
                        </tr>
                        {data.map((sz) => (
                            <tr>
                                <td>{sz.id}</td>
                                <td>{sz.nev}</td>
                                <td>{sz.evelo}</td>
                                <td>{sz.kategoria}</td>
                                <td>{sz.ar}</td>
                                <td>
                                    <button onClick={() => torol(sz.id)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

                <div>
                    <h1>Új növény felvétele</h1>
                    <b>Név:</b>{' '}
                    <input type="text" value={nev} onChange={(e) => setNev(e.target.value)} required />
                    <p>
                        Évelő-e?{' '}
                        <input
                            type="checkbox"
                            onChange={(e) => setEvelo(Boolean(e.target.value))}
                            required
                        />{' '}
                        Igen
                        <input
                            type="checkbox"
                            onChange={(e) => setEvelo(Boolean(e.target.value))}
                            required
                        />{' '}
                        Nem
                    </p>
                    <p>
                        <b>Kategória:</b>{' '}
                        <select
                            value={kategoria}
                            onChange={(e) => setKategoria(e.target.value)}
                            required
                        >
                            <option value="virág">Virág</option>
                            <option value="bokor">Bokor</option>
                            <option value="fa">Fa</option>
                        </select>
                    </p>
                    <p>
                        <b>Ár:</b>{' '}
                        <input
                            type="number"
                            value={ar}
                            onChange={(e) => setAr(Number(e.target.value))}
                            required
                        />
                    </p>
                    <p>
                        <button onClick={() => hozzaad()}>Hozzáad</button>
                    </p>
                </div>
            </div>
        </body>
    );
};

export default PlantsPage;
