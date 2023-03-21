import { useSession } from "next-auth/react";
import { useState } from "react";

type FormState = {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    sendTicket: boolean;
}

const Venue = () => {
    const [formState, setFormState] = useState<FormState>({
        name: undefined,
        email: undefined,
        phone: undefined,
        sendTicket: true,
    });

    return (
        <main className="container mx-auto">
            <h1 className="text-xl" >Klaviyo Hackathon Event!!</h1>
            <h2>Event Details</h2>
            <p>
                125 Summer St.
                Thu, March 23 2023 - 2:00pm
            </p>
            <form className="mt-4">
                <div>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" value={formState.name}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                name: e.target.value
                            })
                        }} />
                </div>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="text" name="email" id="email" placeholder="chonus@klaviyo.com"
                        value={formState.email}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                email: e.target.value
                            })
                        }}>
                    </input>
                </div>
                <div>
                    <label htmlFor="phone">
                        Phone number
                    </label>
                    <input type="tel" name="phone" id="phone" placeholder="15558675309"
                        value={formState.phone}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                phone: e.target.value
                            })
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="sendTicket">
                        Send me my ticket!
                    </label>
                    <input type="checkbox" name="sendTicket" id="sendTicket" checked={formState.sendTicket} onChange={(e) => {
                        setFormState({
                            ...formState,
                            sendTicket: !formState.sendTicket,
                        })
                    }}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Order now
                </button>
            </form>
        </main >
    )
};

export default Venue;
