import { useRef } from 'react';

interface ModalProps {
    onClose: () => void;
}

const AboutUsModal: React.FC<ModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div
            ref={modalRef}
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-10"
        >
            <div className="bg-[rgb(222,209,209)] p-5 rounded-xl border-4 border-black shadow-md flex flex-col gap-10 w-1/2 h-1/2 items-center justify-center">
                <div className="relative flex flex-col h-full overflow-y-auto">
                    <h1 className="font-normal font-[Kavoon] text-[30px] leading-[30px] text-black text-center">
                        About Us
                    </h1>
                    <div className="text-left font-[Kavoon] px-4">
                        <br />
                        Welcome to our Multiplayer UNO Game website where our
                        aim is to bring the joy of UNO to the digital realm,
                        allowing friends and families to connect and play this
                        beloved card game from anywhere in the world. It is a
                        passion project developed under the CSOC’24 (COPS Summer
                        of Code) initiative by COPS. <br />
                        CSOC is one of our flagship programs, designed to
                        provide students with hands-on coding experience during
                        the summer break. Participants engage in a variety of
                        projects, ranging from web development to machine
                        learning, all while being mentored by experienced
                        members of the COPS community. This Multiplayer UNO Game
                        is one of the exciting outcomes of CSOC, showcasing the
                        talent and dedication of our participants. COPS is an
                        enthusiastic community of developers and programmers
                        dedicated to fostering a culture of coding and
                        innovation. It provides a collaborative environment
                        where students can enhance their programming skills,
                        work on real-world projects, and contribute to
                        open-source initiatives. <br /> We invite you to join us
                        in this exciting journey. Whether you are here to play
                        UNO, provide feedback, or become a part of our vibrant
                        community, we welcome you with open arms. Let's connect,
                        code, and create together! For more information about
                        COPS and our initiatives, visit our{' '}
                        <a
                            className=" text-blue-700"
                            href="https://www.copsiitbhu.co.in/"
                        >
                            {' '}
                            official website &nbsp;
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                        . Thank you for visiting, and we hope you enjoy your
                        time playing UNO!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsModal;
