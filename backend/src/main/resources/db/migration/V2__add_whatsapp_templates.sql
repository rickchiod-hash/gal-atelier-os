-- V2__add_whatsapp_templates.sql
-- Gal Atelier OS - WhatsApp Templates Table

CREATE TABLE whatsapp_templates (
    id UUID PRIMARY KEY,
    template_id VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    template_type VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_whatsapp_templates_type ON whatsapp_templates(template_type);
CREATE INDEX idx_whatsapp_templates_active ON whatsapp_templates(active);

-- Insert default templates
INSERT INTO whatsapp_templates (id, template_id, name, content, template_type, active) VALUES
    (RANDOM_UUID(), 'primeiro-atendimento', 'Primeiro atendimento', 'Olá, {nome}! 😍\nObrigada pelo interesse.\nSou especialista em perucas e laces personalizadas.\nComo posso te ajudar hoje?', 'WELCOME', TRUE),
    (RANDOM_UUID(), 'diagnostico', 'Diagnóstico', 'Oi, {nome}! Para te indicar a melhor opção, preciso saber:\n• Já usou wig ou lace antes?\n• Qual o tom da sua pele?\n• Prefere liso ou cacheado?\n• quanto tempo vc quer usar por dia?\nMe conta! 😊', 'DIAGNOSTIC', TRUE),
    (RANDOM_UUID(), 'orcamento', 'Orçamento', 'Oi, {nome}! Segue o orçamento:\n\n{servico}\nValor: R$ {valor}\nPrazo: {prazo}dias\n\nO sinal de R$ {sinal} confirma a reserva.\nPosso te enviar fotos dos materiais?', 'QUOTE', TRUE),
    (RANDOM_UUID(), 'follow-up-24h', 'Follow-up 24h', 'Oi, {nome}! Tudo bem?\nVi que recebeu o orçamento.\nTem alguma dúvida?\nEstou à disposição! 💕', 'FOLLOW_UP_24H', TRUE),
    (RANDOM_UUID(), 'follow-up-72h', 'Follow-up 72h', 'Oi, {nome}! Passando para lembrar do orçamento.\nAs vagas para esse serviço são limitadas.\nMe conta se precisa de algo mais! 😘', 'FOLLOW_UP_72H', TRUE),
    (RANDOM_UUID(), 'cobranca-sinal', 'Cobrança de sinal', 'Oi, {nome}! Tudo certo?\nO prazo para confirmar a reserva é hoje.\nO sinal de R$ {sinal} pode ser via Pix:\n{pix}\nMe avisa quando transferir! ✅', 'DEPOSIT_PAYMENT', TRUE),
    (RANDOM_UUID(), 'confirmacao-pedido', 'Confirmação de pedido', 'Eba, {nome}! Pedido confirmado! 🎉\n\nServiço: {servico}\nPrazo: {prazo} dias\nVou te mandar fotos do progresso!\n\nQualquer dúvida é só chamar.', 'ORDER_CONFIRMATION', TRUE),
    (RANDOM_UUID(), 'em-producao', 'Em produção', 'Oi, {nome}! Seu pedido está em produção! 🔨\nJá fiz a base e escolhi o cabelo.\nTe mando fotos em breve!\n\nPrazo: {prazo} dias', 'IN_PRODUCTION', TRUE),
    (RANDOM_UUID(), 'pedido-pronto', 'Pedido pronto', 'Oi, {nome}! Seu wig/lace está PRONTO! ✨\n\nVem buscar ou prefere que eu envie?\nNão esquece de levar a faixa ou fixação que vc usa em casa!\n\nSee you! 💕', 'ORDER_READY', TRUE),
    (RANDOM_UUID(), 'pos-venda', 'Pós-venda', 'Oi, {nome}! Como ficou o wig/lace? 💕\n\nEspero que ame!\nQualquer dúvida sobre manutenção ou ajuste, me chama.\n\nE se precisar de outro serviço ou indicação, será um prazer ajudar! 😍', 'POST_SALE', TRUE),
    (RANDOM_UUID(), 'pedido-avaliacao', 'Pedido de avaliação', 'Oi, {nome}! amou o resultado? 📸\n\nSe puder, me manda uma foto e conta o que achou!\nSua opinião é muito importante!\n\nE se conhece alguém que quer, me indica! 😘', 'REVIEW_REQUEST', TRUE),
    (RANDOM_UUID(), 'recompra', 'Recompra', 'Oi, {nome}! Passando para lembrar:\nSeu wig já tem {meses} meses.\nÉ hora de fazer manutenção?\nPosso agendar um horário!\n\nOu se quiser uma nova opção, tenho modelos Lindos! 💕', 'REORDER', TRUE),
    (RANDOM_UUID(), 'aniversario', 'Aniversário', 'Feliz aniversário, {nome}! 🎂🎉\n\nQue seu dia seja LINDO!\nEspero que vc ame cada momento.\n\nQuando tiver um tempinho, me conta como foi!\nTe mando um beijo! 😘', 'BIRTHDAY', TRUE);
