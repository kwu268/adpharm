import { Modal, Card } from "@mantine/core";
import { SubmoduleQuestions } from "@/lib/data";

type SubmoduleModalProps = {
  submoduleTitle: string;
  submoduleQuestion: SubmoduleQuestions;
  opened: boolean;
  onClose: () => void;
};

const SubmoduleModal = ({
  submoduleTitle,
  submoduleQuestion,
  opened,
  onClose,
}: SubmoduleModalProps) => {
  return (
    <>
      <Modal
        radius={40}
        withCloseButton={false}
        size={1000}
        styles={{
          title: {
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "right",
          },
        }}
        opened={opened}
        onClose={onClose}
        centered
      >
        <Card
          h="100%"
          style={{ backgroundColor: "#a487e6" }}
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
        >
          <h3 className="font-bold text-lg mb-2">{submoduleTitle}</h3>
          <div className="flex flex-col gap-4 ">
            {Object.entries(submoduleQuestion).map(([question, answer]) => {
              return (
                <div
                  key={question}
                  className={`px-5 ${!answer && "text-red-800"}`}
                >
                  <p className="font-bold">{question}</p>
                  <p className="italic">{answer ? answer : "NA"}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default SubmoduleModal;
