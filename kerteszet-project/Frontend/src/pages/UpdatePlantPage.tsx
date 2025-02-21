import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Plant } from '../types/Plant';
import '../styles/UPageStyle.css';

const UpdatePlantPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<Plant>();
    const [nev, setNev] = useState('');
    const [kategoria, setKategoria] = useState('');
    const [ar, setAr] = useState(0);

    useEffect(() => {
        apiClient
            .get(`/plants/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const frissit = (id?: string) => {
        const plant = {
            nev,
            kategoria,
            ar,
        } as Plant;

        apiClient
            .put(`/plants/${id}`, plant)
            .then((res) => {
                switch (res.status) {
                    case 200:
                        alert('Növény módosítva');
                        window.location.reload();
                        break;
                    case 404:
                        alert('Növény nem található');
                        break;
                    case 400:
                        alert('Bad Request');
                        break;
                    case 500:
                        alert('Szerver Hiba');
                        break;
                    default:
                        alert('Hiba keletkezett');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <body>
            <div id="container">
                <div>
                    <h1>{id}</h1>

                    <h3>Jelenlegi adatok:</h3>
                    <p>
                        <b>Név: </b> {data?.nev}
                    </p>
                    <p>
                        <b>Kategória: </b> {data?.kategoria}
                    </p>
                    <p>
                        <b>Ár: </b> {data?.ar}
                    </p>
                </div>

                <h2>Módosító szekció</h2>
                <div>
                    <b>Név:</b>{' '}
                    <input type="text" value={nev} onChange={(e) => setNev(e.target.value)} />
                    <p>
                        <b>Ár: </b>{' '}
                        <input
                            type="number"
                            value={ar}
                            onChange={(e) => setAr(Number(e.target.value))}
                        />
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
                        <button onClick={() => frissit(id)}>Módosít</button>
                    </p>
                </div>
            </div>
        </body>
    );
};

export default UpdatePlantPage;
